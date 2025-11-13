'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 w-full border-t border-gray-200 px-10 py-10 text-sm text-gray-600 lg:px-40">
      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        {/* Coluna Esquerda */}
        <div className="flex max-w-xs flex-col gap-4">
          <div className="flex h-16 w-32 items-center justify-center rounded-md border border-gray-400">
            <span className="font-medium text-gray-800">Logo</span>
          </div>
          <p className="text-sm text-gray-500">
            Uma rede que conecta projetos e profissionais para criar soluções
            digitais.
          </p>
        </div>

        {/* Coluna Central (agora horizontal) */}
        <div className="flex flex-col">
          <h4 className="mb-3 font-medium text-gray-800">Navegue</h4>
          <ul className="flex flex-row gap-6 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Portfólios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Dúvidas
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna Direita */}
        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-gray-800">Entre em contato</h4>
          <p className="text-sm text-gray-500">
            Conta sua ideia ou dúvida pra gente.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Escrever e-mail..."
              className="w-64 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none"
            />
            <button className="rounded-full bg-gray-800 px-6 py-2 text-sm text-white hover:bg-gray-700">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="mt-10 flex flex-col justify-between border-t border-gray-200 pt-5 text-xs text-gray-400 lg:flex-row">
        <p>© 2025 Try Catch For Match. All rights reserved</p>
        <p>Design by NDHC</p>
      </div>
    </footer>
  );
}
