import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  currentYear = new Date().getFullYear();

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    // Intersection observer for reveal animations
    const rootEl = this.host.nativeElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-6', 'delay-100', 'delay-150', 'delay-200');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1});

    rootEl.querySelectorAll('.opacity-0').forEach(el => observer.observe(el));

    // Initialize lucide icons if library is available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maybeLucide = (window as any).lucide;
    if (maybeLucide && typeof maybeLucide.createIcons === 'function') {
      try {
        maybeLucide.createIcons({attr: {'stroke-width': 1.5}});
      } catch {
        // ignore
      }
    }

    // Language switcher
    const langButtons = rootEl.querySelectorAll<HTMLButtonElement>('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset['lang'] || 'en';
        document.documentElement.lang = chosen;
        langButtons.forEach(b => b.classList.toggle('font-semibold', b === btn));
      });
    });
  }
}
