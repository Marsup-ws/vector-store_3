'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/utils/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const ITEMS_PER_PAGE = 10;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Édit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<{
    name: string;
    title: string;
    price: number | string;
    category: string;
  }>({
    name: '',
    title: '',
    price: 0,
    category: '',
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Charge les produits depuis le backend NestJS
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      console.error('Erreur chargement produits backend:', err);
      setError(err.message || 'Impossible de se connecter au serveur backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrage par recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.id?.toString().includes(q)
    );
  }, [products, searchQuery]);

  // Réinitialisation de la page quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination (10 par page)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Ouverture de la modale d'édition
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormValues({
      name: product.name || '',
      title: product.title || '',
      price: product.price ?? 0,
      category: product.category || '',
    });
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsSaving(false);
    setSaveError(null);
  };

  // Enregistrement des modifications
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    const updatedData = {
      name: formValues.name,
      title: formValues.title,
      price: Number(formValues.price),
      category: formValues.category,
    };

    try {
      const res = await fetch(`${API_URL}/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur serveur (${res.status})`);
      }

      const updatedProductFromApi = await res.json();

      // Mise à jour de l'état local
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updatedProductFromApi } : p))
      );

      setSaveSuccess('Produit mis à jour avec succès dans la base SQL !');
      setTimeout(() => {
        handleCloseModal();
      }, 800);
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde du produit:', err);
      setSaveError(err.message || 'Échec de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] p-4 md:p-8 text-slate-800">
      <div className="mx-auto max-w-7xl">
        {/* HEADER ET BREADCRUMB */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Link href="/admin" className="hover:text-[#2b3a67] transition-colors">
                Admin Dashboard
              </Link>
              <span>/</span>
              <span className="text-[#2b3a67]">Produits</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#2b3a67]">
              Gestion des Produits SQL
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Édition en temps réel des produits stockés dans PostgreSQL via l'API NestJS.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadProducts}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
              Rafraîchir
            </button>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2b3a67] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1e2a4f]"
            >
              Voir la boutique
            </Link>
          </div>
        </div>

        {/* BARRE DE RECHERCHE ET NOMBRES */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher par nom, titre ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2b3a67] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2b3a67]/20 transition-all"
            />
          </div>

          <div className="text-xs font-medium text-slate-500">
            Total : <span className="font-bold text-slate-800">{filteredProducts.length}</span> produit(s)
          </div>
        </div>

        {/* ERREUR EVENTUELLE */}
        {error && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700 flex items-center justify-between">
            <div>
              <strong>Erreur backend :</strong> {error}
            </div>
            <button
              onClick={loadProducts}
              className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* TABLE DES PRODUITS */}
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2b3a67] border-r-transparent mb-3"></div>
              <p className="text-sm font-medium">Chargement des produits depuis PostgreSQL...</p>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p className="text-base font-semibold text-slate-700">Aucun produit trouvé</p>
              <p className="text-xs text-slate-400 mt-1">Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Visuel</th>
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Nom</th>
                    <th className="py-3.5 px-4">Titre</th>
                    <th className="py-3.5 px-4">Catégorie</th>
                    <th className="py-3.5 px-4">Prix (€)</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {paginatedProducts.map((product) => {
                    const imageSrc = product.img || product.image || '/mug_vector_flame.png';
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                        onClick={() => handleOpenEditModal(product)}
                      >
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                            <Image
                              src={imageSrc}
                              alt={product.name || 'Produit'}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-500">{product.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-[#2b3a67]">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{product.title || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                            {product.category || 'Non catégorisé'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {Number(product.price).toFixed(2)} €
                        </td>
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2b3a67]/10 px-3 py-1.5 text-xs font-semibold text-[#2b3a67] transition hover:bg-[#2b3a67] hover:text-white"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Éditer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* CONTROLES DE PAGINATION */}
          {!loading && filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-600">
              <div>
                Affichage de <span className="font-semibold text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> à{' '}
                <span className="font-semibold text-slate-800">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span>{' '}
                sur <span className="font-semibold text-slate-800">{filteredProducts.length}</span> résultats
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`rounded-lg px-3 py-1.5 font-medium transition ${
                      currentPage === pageNum
                        ? 'bg-[#2b3a67] text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALE D'ÉDITION */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 animate-scaleUp">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-[#2b3a67]">
                  Éditer le produit
                </h3>
                <p className="text-xs text-slate-500 font-mono">ID: {editingProduct.id}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {saveSuccess && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-700">
                  {saveSuccess}
                </div>
              )}

              {saveError && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-medium text-rose-700">
                  {saveError}
                </div>
              )}

              {/* CHAMP NOM */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nom du produit
                </label>
                <input
                  type="text"
                  required
                  value={formValues.name}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#2b3a67] focus:outline-none focus:ring-2 focus:ring-[#2b3a67]/20 transition-all"
                  placeholder="Ex: Mug Vector Flame"
                />
              </div>

              {/* CHAMP TITRE */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Titre d'affichage
                </label>
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#2b3a67] focus:outline-none focus:ring-2 focus:ring-[#2b3a67]/20 transition-all"
                  placeholder="Ex: Mug &quot;Vector Flame&quot;"
                />
              </div>

              {/* GRID PRIX ET CATEGORIE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CHAMP PRIX */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formValues.price}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#2b3a67] focus:outline-none focus:ring-2 focus:ring-[#2b3a67]/20 transition-all"
                    placeholder="19.00"
                  />
                </div>

                {/* CHAMP CATEGORIE */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={formValues.category}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#2b3a67] focus:outline-none focus:ring-2 focus:ring-[#2b3a67]/20 transition-all"
                    placeholder="Ex: mugs, vetements, supports"
                  />
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2b3a67] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e2a4f] disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                      Sauvegarde...
                    </>
                  ) : (
                    'Sauvegarder'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
