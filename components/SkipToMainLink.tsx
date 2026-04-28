"use client";

import React from "react";

export default function SkipToMainLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();

        const mainTarget = document.getElementById("main-content");
        if (!mainTarget) {
          return;
        }

        window.location.hash = "main-content";
        mainTarget.focus({ preventScroll: true });
      }}
    >
      Saltar al contenido principal
    </a>
  );
}
