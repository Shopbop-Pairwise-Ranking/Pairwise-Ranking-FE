import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input() imageSrc: string = '';        // Path to the image
  @Input() altText: string = 'Image';    // Alt text for accessibility
  @Input() buttonText: string = 'Button'; // Button label

  @Output() buttonClick = new EventEmitter<void>(); // Event emitter for button click

  // Function to emit the click event
  onButtonClick() {
    this.buttonClick.emit();
  }
}
