import { Component } from '@angular/core';

export const PREFIX = '--';

@Component({
  selector: 'app-sass-helper',
  templateUrl: './sass-helper.component.html',
  styleUrls: ['./sass-helper.component.sass'],
})
export class SassHelperComponent {
  /**
   * Read the custom property of body section with given name.
   * @param name The property name.
   * @returns The property value.
   */
  readProperty(name: string): string {
    const bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(PREFIX + name).trim();
  }
}
