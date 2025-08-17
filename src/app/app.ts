import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  currentYear = new Date().getFullYear();

  recipientEmail = 'filippo.developer@gmail.com';

  constructor(private host: ElementRef<HTMLElement>) {
  }

  openMail(event: Event): void {
    event.preventDefault();

    const rootEl = this.host.nativeElement;
    const nameInput = rootEl.querySelector<HTMLInputElement>('#name');
    const emailInput = rootEl.querySelector<HTMLInputElement>('#email');
    const messageInput = rootEl.querySelector<HTMLTextAreaElement>('#message');

    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();

    const subjectBase = 'New message from portfolio site';
    const subjectDetails = [name, email].filter(Boolean).join(' · ');
    const subject = subjectDetails ? `${subjectBase} — ${subjectDetails}` : subjectBase;

    const lines = [] as string[];
    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    if (message) {
      if (lines.length) lines.push('');
      lines.push(message);
    }
    const body = lines.join('\n');

    const to = this.recipientEmail ? encodeURIComponent(this.recipientEmail) : '';
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Trigger default mail client
    window.location.href = mailto;
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
