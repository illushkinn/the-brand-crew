#!/usr/bin/env python3
"""
Export The Brand Crew business card HTML to PDF.

Usage:
    python export-pdf.py

Generates 'business-card.pdf' in the same directory as the HTML.

Requirements:
    - weasyprint (auto-installed if missing)
    - On Linux: libpango, libpangocairo, libgdk-pixbuf2.0-dev
"""

import subprocess
import sys
import os

# ── Paths ──────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_PATH  = os.path.join(SCRIPT_DIR, "business-card.html")
PDF_PATH   = os.path.join(SCRIPT_DIR, "business-card.pdf")


def check_system_deps() -> bool:
    """Verify system libraries for WeasyPrint are available (Linux)."""
    if sys.platform != "linux":
        return True  # macOS/Windows bundle their own deps

    missing = []
    libs = [
        ("libpango-1.0-0",   "libpango-1.0-0"),
        ("libpangocairo",    "libpangocairo-1.0-0"),
        ("libgdk_pixbuf",    "libgdk-pixbuf-2.0-0"),
    ]

    for _name, soname in libs:
        try:
            result = subprocess.run(
                ["ldconfig", "-p"],
                capture_output=True, text=True, timeout=10,
            )
            if soname not in result.stdout:
                missing.append(soname)
        except Exception:
            missing.append(soname)

    if missing:
        print("⚠️  Algunas dependencias del sistema podrían faltar en Linux:")
        for lib in missing:
            print(f"   • {lib}")
        print()
        print("   Instalalas con:")
        print("   sudo apt-get install libpango-1.0-0 libpangocairo-1.0-0 "
              "libgdk-pixbuf2.0-dev")
        print()
        return False
    return True


def ensure_weasyprint():
    """Import weasyprint, installing it if necessary."""
    try:
        from weasyprint import HTML  # noqa: F401
        return True
    except ImportError:
        pass

    print("📦 WeasyPrint no está instalado. Instalando…")
    try:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "weasyprint"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        print("✅ WeasyPrint instalado correctamente")
        return True
    except subprocess.CalledProcessError:
        print("❌ No se pudo instalar WeasyPrint automáticamente.")
        print()
        print("   Intentá manualmente:")
        print("   pip install weasyprint")
        print()
        print("   En Linux, primero asegurate de tener las dependencias:")
        print("   sudo apt-get install libpango-1.0-0 libpangocairo-1.0-0 "
              "libgdk-pixbuf2.0-dev")
        return False
    except Exception as exc:
        print(f"❌ Error inesperado: {exc}")
        return False


def main():
    """Convert business-card.html → business-card.pdf via WeasyPrint."""
    print("═" * 48)
    print("  The Brand Crew — Exportar tarjeta a PDF")
    print("═" * 48)
    print()

    # ── Check HTML exists ────────────────────────────────────────
    if not os.path.exists(HTML_PATH):
        print(f"❌ No se encuentra: {HTML_PATH}")
        print("   Asegurate de ejecutar este script en la misma carpeta "
              "que business-card.html")
        sys.exit(1)

    print(f"📄 Origen:  {HTML_PATH}")
    print(f"🎯 Destino: {PDF_PATH}")
    print()

    # ── System deps (Linux) ──────────────────────────────────────
    check_system_deps()

    # ── Ensure weasyprint ────────────────────────────────────────
    if not ensure_weasyprint():
        sys.exit(1)

    # ── Convert ──────────────────────────────────────────────────
    try:
        from weasyprint import HTML

        print("🔄 Convirtiendo HTML a PDF…")

        HTML(HTML_PATH).write_pdf(PDF_PATH)

        size_kb = os.path.getsize(PDF_PATH) / 1024
        print(f"✅ Listo: {PDF_PATH} ({size_kb:.1f} KB)")
        print()
        print("   Las páginas del PDF miden exactamente 90×50mm.")
        print("   Enviá este archivo directo a la gráfica.")
        print()
        print("⚠️  NOTA: WeasyPrint usa las fuentes del sistema.")
        print("   Para ver el diseño exacto con Darker Grotesque,")
        print("   imprimí a PDF desde Chrome/Edge (Ctrl+P).")

    except Exception as exc:
        print(f"❌ Error al generar el PDF: {exc}")
        print()
        print("   Posibles soluciones:")
        print("   1. Verificá que el HTML no tenga errores")
        print("   2. Probá con `weasyprint --version`")
        print("   3. Como alternativa, abrí el HTML en Chrome y ")
        print("      exportá a PDF desde el diálogo de impresión")
        sys.exit(1)


if __name__ == "__main__":
    main()
