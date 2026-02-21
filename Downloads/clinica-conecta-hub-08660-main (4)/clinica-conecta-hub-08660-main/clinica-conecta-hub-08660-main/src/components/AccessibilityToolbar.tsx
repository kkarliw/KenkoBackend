import { useState, useEffect, useCallback } from "react";
import {
  Accessibility, Eye, Type, Volume2,
  Play, Pause, Square, MousePointer, X, RotateCcw
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [simplifiedUI, setSimplifiedUI] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverToRead, setHoverToRead] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
    const savedFontSize = localStorage.getItem("a11y-font-size");
    const savedContrast = localStorage.getItem("a11y-high-contrast");
    const savedSimplified = localStorage.getItem("a11y-simplified");

    if (savedFontSize) { const s = parseInt(savedFontSize); setFontSize(s); document.documentElement.style.fontSize = `${s}%`; }
    if (savedContrast === "true") { setHighContrast(true); document.documentElement.classList.add("high-contrast"); }
    if (savedSimplified === "true") { setSimplifiedUI(true); document.documentElement.classList.add("simplified-ui"); }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("a11y-font-size", fontSize.toString());
    return () => { document.documentElement.style.fontSize = "100%"; };
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("a11y-high-contrast", highContrast.toString());
    return () => { document.documentElement.classList.remove("high-contrast"); };
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("simplified-ui", simplifiedUI);
    localStorage.setItem("a11y-simplified", simplifiedUI.toString());
    return () => { document.documentElement.classList.remove("simplified-ui"); };
  }, [simplifiedUI]);

  useEffect(() => {
    if (!hoverToRead || !speechSynthesis) return;
    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const text = t.textContent?.trim();
      if (text && text.length > 0 && text.length < 500 && t.matches("p, h1, h2, h3, h4, h5, h6, span, a, button, label, li, td, th, [role='button']")) {
        t.style.outline = "2px solid hsl(224 71% 33%)";
        t.style.outlineOffset = "2px";
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "es-ES"; u.rate = 0.9;
        speechSynthesis.speak(u);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      t.style.outline = ""; t.style.outlineOffset = "";
      speechSynthesis.cancel();
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => { document.removeEventListener("mouseover", handleOver); document.removeEventListener("mouseout", handleOut); speechSynthesis.cancel(); };
  }, [hoverToRead, speechSynthesis]);

  const startReading = useCallback(() => {
    if (!speechSynthesis) { toast.error("Tu navegador no soporta lectura en voz alta"); return; }
    const main = document.querySelector("main") || document.body;
    const els = main.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th");
    let text = "";
    els.forEach(el => { const t = el.textContent?.trim(); if (t) text += t + ". "; });
    if (!text.trim()) { toast.info("No hay contenido para leer"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES"; u.rate = 0.9;
    u.onstart = () => { setIsReading(true); setIsPaused(false); };
    u.onend = () => { setIsReading(false); setIsPaused(false); };
    u.onerror = () => { setIsReading(false); setIsPaused(false); };
    speechSynthesis.speak(u);
  }, [speechSynthesis]);

  const pauseReading = useCallback(() => {
    if (!speechSynthesis) return;
    if (isPaused) { speechSynthesis.resume(); setIsPaused(false); }
    else { speechSynthesis.pause(); setIsPaused(true); }
  }, [speechSynthesis, isPaused]);

  const stopReading = useCallback(() => {
    if (speechSynthesis) { speechSynthesis.cancel(); setIsReading(false); setIsPaused(false); }
  }, [speechSynthesis]);

  const reset = () => {
    setFontSize(100); setHighContrast(false); setSimplifiedUI(false); setHoverToRead(false);
    stopReading(); toast.success("Configuración restablecida");
  };

  return (
    <>
      {/* Floating trigger — bottom-right 48px */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-lg bg-primary text-primary-foreground shadow-clinical flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Opciones de accesibilidad"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {/* Side panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/10" onClick={() => setIsOpen(false)} />
          <aside
            className="fixed top-0 right-0 h-screen w-80 bg-card border-l border-border z-50 flex flex-col shadow-clinical"
            role="dialog"
            aria-label="Panel de accesibilidad"
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Accesibilidad</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} className="p-2 rounded text-muted-foreground hover:text-foreground" aria-label="Restablecer">
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded text-muted-foreground hover:text-foreground" aria-label="Cerrar">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm">
                  <Type className="h-4 w-4" /> Tamaño de texto
                  <span className="ml-auto text-muted-foreground text-clinical-small">{fontSize}%</span>
                </Label>
                <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={75} max={150} step={5} aria-label="Tamaño de texto" />
              </div>

              <div className="border-t border-border" />

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <Label htmlFor="hc" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Eye className="h-4 w-4" />
                  <div>
                    <p>Alto contraste</p>
                    <p className="text-clinical-small text-muted-foreground font-normal">Ratio 7:1 mínimo</p>
                  </div>
                </Label>
                <Switch id="hc" checked={highContrast} onCheckedChange={setHighContrast} aria-label="Alto contraste" />
              </div>

              {/* Simplified UI */}
              <div className="flex items-center justify-between">
                <Label htmlFor="simple" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Accessibility className="h-4 w-4" />
                  <div>
                    <p>Modo simplificado</p>
                    <p className="text-clinical-small text-muted-foreground font-normal">Botones grandes, menos densidad</p>
                  </div>
                </Label>
                <Switch id="simple" checked={simplifiedUI} onCheckedChange={setSimplifiedUI} aria-label="Modo simplificado" />
              </div>

              <div className="border-t border-border" />

              {/* TTS */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm">
                  <Volume2 className="h-4 w-4" /> Leer en voz alta
                </Label>
                <div className="flex gap-2">
                  {!isReading ? (
                    <button onClick={startReading} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-muted" aria-label="Reproducir">
                      <Play className="h-3.5 w-3.5" /> Reproducir
                    </button>
                  ) : (
                    <>
                      <button onClick={pauseReading} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-muted" aria-label={isPaused ? "Reanudar" : "Pausar"}>
                        {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                        {isPaused ? "Reanudar" : "Pausar"}
                      </button>
                      <button onClick={stopReading} className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted" aria-label="Detener">
                        <Square className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Hover to read */}
              <div className="flex items-center justify-between">
                <Label htmlFor="hover" className="flex items-center gap-2 text-sm cursor-pointer">
                  <MousePointer className="h-4 w-4" />
                  <div>
                    <p>Leer al hover</p>
                    <p className="text-clinical-small text-muted-foreground font-normal">Lee texto al pasar el cursor</p>
                  </div>
                </Label>
                <Switch id="hover" checked={hoverToRead} onCheckedChange={setHoverToRead} aria-label="Leer al hover" />
              </div>

              {isReading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Volume2 className="h-4 w-4 animate-pulse" />
                  <span>{isPaused ? "En pausa..." : "Leyendo..."}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border text-center">
              <p className="text-clinical-small text-muted-foreground">WCAG 2.1 AA</p>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
