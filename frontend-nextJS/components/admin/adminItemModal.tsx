"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface AdminItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item) => void;
  initialData?: Item | null;
  type: "article" | "service";
}

export function AdminItemModal({ isOpen, onClose, onSave, initialData, type }: AdminItemModalProps) {
  const { t } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setImage(initialData.image || "");
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
    }
  }, [initialData, isOpen]);

  // Handle Drag & Drop / File Upload
  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || `${type}-${Date.now()}`,
      title,
      description,
      price: Number(price) || 0,
      image,
    });
    onClose();
  };

  if (!isOpen) return null;

  const modalTitle = initialData
    ? (type === 'article' ? t.adminPage.modalEditArticle : t.adminPage.modalEditService)
    : (type === 'article' ? t.adminPage.modalAddArticle : t.adminPage.modalAddService);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-xl font-serif font-bold text-slate-800">
              {modalTitle}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Zone Drop Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.adminPage.imageLabel}
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed transition cursor-pointer overflow-hidden ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {image ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white font-medium text-sm">
                      {t.adminPage.changeImage}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="h-8 w-8 mb-2 text-gray-400" />
                    <span className="text-xs font-medium">
                      {t.adminPage.dragImage}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.adminPage.titleLabel}</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Ex: Cadre Photo Sublimation"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.adminPage.descLabel}</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Description..."
              />
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.adminPage.priceLabel}</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="35.00"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                {t.adminPage.cancelBtn}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e2a4f] transition"
              >
                {t.adminPage.saveBtn}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}