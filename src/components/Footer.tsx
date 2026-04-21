import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">
            Hecho en Granada con mucho cariño, algo de guasa y un poco de cotilleo.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <span className="text-muted-foreground">Sobre</span>
          <span className="text-muted-foreground">Instagram</span>
          <Link to="/contacto" className="hover:text-[color:var(--brand-blue)]">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
