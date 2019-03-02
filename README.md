# stencil-reflector
Reflects properties decorated with `@reflect` back to their parent `stencil` components.

## Why reflect?
> Stencil only compares references for changes, and will not re-render when data inside of an array or object changes. [ [1]](https://stenciljs.com/docs/reactive-data)

`stencil-reflector` is a minimalistic approach of solving the synchronisation issues when working with instances as properties of stencil web components.

*Properties decorated with `@reflect` will cause the component to re-render. And that's about it.*

## Install
    npm install stencil-reflector --save-dev
    
*...or copy the decorator from `index.ts`, it's just a few lines of code.*

## Example
**Todo.ts**
```ts
class Todo extends Reflector {
    @reflect text: string;
    @reflect isDone: boolean;
    
    complete(){
        // will re-render <my-component/>
        this.isDone = true;
    }
}
```

**my-components.ts**
```ts
@Component({
    tagName: 'my-component'
})
export class MyComponent {
    @Element() el: HTMLStencilElement;
    
    todo: Todo;
    
    componenWillLoad(){
        // instances of Reflector require the components element as first parameter
        this.todo = new Todo(this.el, {
            text: 'Implement stencil-reflector',
            isDone: false
        });
    }
    
    render(){
        return [
            todo.text,
            todo.isDone ? 'completed' :
                <input type="checkbox" onInput={() => todo.complete()} />
        ]
    }
}
```

## API


### `@reflect`
Indicates that the property should be synchronized back to the component. Requires the instance to have `this.el` assigned to the target component.

### `Reflector`
Can be used to inherit classes from, but is not required when instances have the component assigned as `this.el`.

```
class Todo extends Reflector {}
const todo = new Todo(myComponent);
console.log('Will reflect decorated properties to:',todo.el);
```



### Thanks to
- [stencil](https://github.com/ionic-team/stencil)
- [RomkeVdMeulen](https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b)