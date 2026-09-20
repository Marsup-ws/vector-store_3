"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, FileText } from "lucide-react";
import initialData from "@/utils/data/admin.json";
import { AdminItemModal, Item } from "@/components/admin/adminItemModal";
import { useApp } from "@/context/AppContext";

import Link from "next/link";

export default function AdminDashboard() {
  const { t } = useApp();
  const [articles, setArticles] = useState<Item[]>(initialData.articles);
  const [services, setServices] = useState<Item[]>(initialData.services);

  // État pour la gestion de la modale
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "article" | "service";
    item: Item | null;
  }>({
    isOpen: false,
    type: "article",
    item: null,
  });

  const openModal = (type: "article" | "service", item: Item | null = null) => {
    setModalConfig({ isOpen: true, type, item });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Enregistrement (Création ou Édition)
  const handleSave = (savedItem: Item) => {
    const isArticle = modalConfig.type === "article";
    const list = isArticle ? articles : services;
    const setList = isArticle ? setArticles : setServices;

    const exists = list.some((i) => i.id === savedItem.id);

    if (exists) {
      setList(list.map((i) => (i.id === savedItem.id ? savedItem : i)));
    } else {
      setList([...list, savedItem]);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] p-8 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#2b3a67]">Tableau de Bord Admin</h1>
            <p className="text-xs text-slate-500">Gérez le contenu, les articles, les services et les produits SQL.</p>
          </div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2b3a67] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e2a4f]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Gérer les Produits SQL
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* SECTION ARTICLES (COL 7) */}
        <section className="lg:col-span-7 rounded-2xl bg-slate-50/50 p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-serif font-bold text-[#2b3a67]">{t.adminPage.articlesTitle}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => openModal("article")}
                className="rounded-lg bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e2a4f]"
              >
                {t.adminPage.addBtn}
              </button>
              <button
                onClick={() => articles.length > 0 && setArticles(articles.slice(0, -1))}
                className="rounded-lg bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e2a4f]"
              >
                {t.adminPage.deleteBtn}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => openModal("article", item)}
                className="cursor-pointer flex gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100 hover:shadow-md transition"
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">{t.adminPage.noImage}</div>
                  )}
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right font-bold text-sm text-slate-900">
                    {item.price.toFixed(2)} €
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION SERVICES (COL 5) */}
        <section className="lg:col-span-5 rounded-2xl bg-slate-50/50 p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-serif font-bold text-[#2b3a67]">{t.adminPage.servicesTitle}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => openModal("service")}
                className="rounded-lg bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e2a4f]"
              >
                {t.adminPage.newServiceBtn}
              </button>
              <button
                onClick={() => services.length > 0 && openModal("service", services[0])}
                className="rounded-lg bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e2a4f]"
              >
                {t.adminPage.editBtn}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => openModal("service", item)}
                className="cursor-pointer flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition"
              >
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100/70 p-2 text-slate-600">
                  <FileText className="h-7 w-7 stroke-[1.5]" />
                  <span className="text-[10px] font-medium mt-1">{t.adminPage.servicesTitle} {idx + 1}</span>
                </div>
                <div className="flex flex-col justify-between flex-1 self-stretch">
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right font-bold text-sm text-slate-900">
                    {item.price.toFixed(2)} €
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      </div>

      {/* Modale d'ajout / modification */}
      <AdminItemModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={modalConfig.item}
        type={modalConfig.type}
      />
    </main>
  );
}