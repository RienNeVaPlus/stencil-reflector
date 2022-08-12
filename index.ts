import { forceUpdate } from '@stencil/core'

/**
 * Extended version of https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b#file-prop-decorator-ts
 * @param prototype
 * @param key
 * @param mapper
 */
function makePropertyMapper<T>(prototype: any, key: string, mapper: (value: any, instance: any) => T) {
	const values = new Map<any, T>();
	Object.defineProperty(prototype, key, {
		set(firstValue: any) {
			Object.defineProperty(this, key, {
				get() {
					return values.get(this);
				},
				set(value: any) {
					values.set(this, mapper(value, this));
				},
				enumerable: true,
			});
			this[key] = firstValue;
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * Reflect decorator
 * @param target
 * @param key
 */
export function reflect(target: any, key: string): void {
	makePropertyMapper(target, key, (value: number, instance) => {
		if(!instance.el)
			throw new Error('Missing property `el` on class');

		// detect change
		if(instance[key] !== value){
      forceUpdate(instance.el);
    }

		return value;
	});
}

/**
 * Reflector class to extend (provides this.el)
 */
export class Reflector {
	constructor(public el: HTMLElement, doc?: object){
		if(doc) Object.assign(this, doc);
	}
}