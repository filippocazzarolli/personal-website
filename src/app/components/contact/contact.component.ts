import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements AfterViewInit {
  recipientEmail = 'filippo.developer@gmail.com';

  constructor(private host: ElementRef<HTMLElement>, private translate: TranslateService) {}

  openMail(event: Event): void {
    event.preventDefault();

    const rootEl = this.host.nativeElement;
    const nameInput = rootEl.querySelector<HTMLInputElement>('#name');
    const emailInput = rootEl.querySelector<HTMLInputElement>('#email');
    const messageInput = rootEl.querySelector<HTMLTextAreaElement>('#message');

    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();

    const subjectBase = this.translate.instant('MAIL.SUBJECT_BASE') || 'New message from portfolio site';
    const subjectDetails = [name, email].filter(Boolean).join(' · ');
    const subject = subjectDetails ? `${subjectBase} — ${subjectDetails}` : subjectBase;

    const lines = [] as string[];
    if (name) lines.push(`${this.translate.instant('MAIL.NAME_LABEL') || 'Name'}: ${name}`);
    if (email) lines.push(`${this.translate.instant('MAIL.EMAIL_LABEL') || 'Email'}: ${email}`);
    if (message) {
      if (lines.length) lines.push('');
      lines.push(message);
    }
    const body = lines.join('\n');

    const to = this.recipientEmail ? encodeURIComponent(this.recipientEmail) : '';
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  ngAfterViewInit(): void {
    // Let AppComponent's IntersectionObserver handle reveal animations if present; no-op here.
  }
}
