"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock, ArrowRight, MailCheck, LockIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function LoginModal() {
  const {
    isLoginOpen,
    setIsLoginOpen,
    setIsLogonOpen,
    currentUser,
    setCurrentUser,
    addToast,
  } = useApp();

  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [recoverySuccessMsg, setRecoverySuccessMsg] = useState<string | null>(
    null,
  );

  if (!isLoginOpen) return null;

  const handleClose = () => {
    setIsLoginOpen(false);
    setHasError(false);
    setRecoverySuccessMsg(null);
  };

  const handleSwitchToLogon = () => {
    handleClose();
    setIsLogonOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim() || !passwordInput.trim()) return;

    setIsSubmitting(true);
    setHasError(false);
    setRecoverySuccessMsg(null);

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginInput, password: passwordInput }),
      });

      if (!res.ok) {
        // En cas d'erreur de mot de passe ou login : le login reste saisi, le password se vide
        setPasswordInput("");
        setHasError(true);
        return;
      }

      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        addToast(`Bienvenue ${data.user.login} !`, "success");
        handleClose();
      } else {
        setPasswordInput("");
        setHasError(true);
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setPasswordInput("");
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecoverPassword = async () => {
    if (!loginInput.trim()) return;
    setIsRecovering(true);
    try {
      const res = await fetch(`${API_URL}/users/recover-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRecoverySuccessMsg(
          data.message || "Mot de passe envoyé par email !",
        );
        addToast(data.message || "Mot de passe envoyé par email", "info");
      } else {
        addToast(data.message || "Utilisateur introuvable", "error");
      }
    } catch (err) {
      console.error("Erreur de récupération:", err);
      addToast("Erreur lors de l'envoi de l'email.", "error");
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center text-center contact-card contact-form-card relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100"
        >
          {/* BOUTON FERMER (CROIX) */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* HEADER MODALE */}
          <div className="contact-card-header">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-[#2b3a67]">
                Espace Connexion
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Connectez-vous pour accéder à votre espace personnalisé
              </p>
            </div>
          </div>

          {/* FORMULAIRE LOGIN */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CHAMP LOGIN */}
            <div className="contact-info-item">
              <div className="contact-item-icon-box">
                <User />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">
                  Nom de utilisateur / Login{" "}
                  <span className="required-star">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => {
                    setLoginInput(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="Login"
                  className="contact-input"
                />
              </div>
            </div>

            {/* CHAMP MOT DE PASSE */}
            <div className="contact-info-item">
              <div className="contact-item-icon-box">
                <LockIcon />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">
                  Mot de passe / password{" "}
                  <span className="required-star">*</span>
                </label>
                <input
                  id="contact-name"
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="••••••••"
                  className="contact-input"
                />
              </div>
            </div>

            {/* LIGNE D'ERREUR ROUGE ET RECUPERATION EMAIL */}
            {hasError && (
              <div className="py-1 text-center">
                <button
                  type="button"
                  onClick={handleRecoverPassword}
                  disabled={isRecovering}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline transition-colors cursor-pointer"
                >
                  {isRecovering
                    ? "Envoi en cours..."
                    : "Erreur de saisie. Recevoir le password par email ?"}
                </button>
              </div>
            )}

            {/* MESSAGE DE SUCCÈS RÉCUPÉRATION */}
            {recoverySuccessMsg && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-700 flex items-center gap-2">
                <MailCheck size={16} />
                <span>{recoverySuccessMsg}</span>
              </div>
            )}

            {/* BOUTON SE CONNECTER */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* LIEN CREER UN COMPTE */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <button
              type="button"
              onClick={handleSwitchToLogon}
              className="text-xs text-slate-600 hover:text-[#2b3a67] font-medium transition-colors"
            >
              Pas encore inscrit ?{" "}
              <span className="font-semibold underline">Créez un compte</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
