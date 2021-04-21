﻿import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';

import { ModalService } from './modal.service';

// TODO: convert this component and associated service to use Angular Portals
@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Input() maxWidth = 600;
  private element: HTMLElement;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.close();
  }

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // Move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // Close modal on background click
    this.element.addEventListener('click', (event: MouseEvent) => {
      const el = event?.target as HTMLElement;

      if (el.id === this.id) {
        this.close();
      }
    });

    // Add self (this modal instance) to the modal service so it's accessible from components
    this.modalService.add(this);
  }

  // Remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }

  get maxWidthPixels() {
    return `${this.maxWidth}px`;
  }
}
