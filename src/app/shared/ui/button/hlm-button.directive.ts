/**
 * SPARTAN UI - HlmButtonDirective
 * Componente de Spartan UI (https://www.spartan.ng)
 * Diretiva que aplica los estilos de botón del sistema de diseño Spartan
 * sobre cualquier elemento <button> o <a> que use la directiva `hlmBtn`.
 *
 * Uso: <button hlmBtn>Click me</button>
 *      <button hlmBtn variant="outline">Outline</button>
 *      <button hlmBtn variant="ghost" size="sm">Ghost</button>
 */
import { Directive, HostBinding, Input } from '@angular/core';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Directive({
  // Selector de atributo: se aplica a cualquier <button hlmBtn> o <a hlmBtn>
  selector: 'button[hlmBtn], a[hlmBtn]',
  standalone: true,
  host: {
    // Clase base siempre aplicada (Spartan pattern)
    class:
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  },
})
export class HlmButtonDirective {
  /** Variante visual del botón (Spartan UI pattern: variantes con class-variance-authority) */
  @Input() variant: ButtonVariant = 'default';

  /** Tamaño del botón */
  @Input() size: ButtonSize = 'md';

  /** Clases dinámicas según variante y tamaño (equivalente al cva() de Spartan) */
  @HostBinding('class')
  get hostClasses(): string {
    const variantClasses: Record<ButtonVariant, string> = {
      default:
        'bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-sm font-bold',
      outline:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-base rounded-xl',
      icon: 'h-10 w-10',
    };

    return `${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}
