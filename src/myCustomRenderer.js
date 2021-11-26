import { Game, GameObject, Scene } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { TextSystem, Text } from '@eva/plugin-renderer-text';
import ReactReconciler from 'react-reconciler';
let game
const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => { },
  resetAfterCommit: () => { },
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    if (type === 'eva') {
      return game
    } else if (type === 'gameobject') {
      console.log('createInstance', newProps)
      const go = new GameObject('', {
        size: {
          width: newProps.width || 100,
          height: newProps.height || 100
        },
        position: {
          x: newProps.x || 0,
          y: newProps.y || 0
        },
        rotation: newProps.rotation || 0,
        origin: {
          x: newProps.originX || 0,
          y: newProps.originY || 0
        },
        anchor: {
          x: newProps.anchorX || 0,
          y: newProps.anchorY || 0
        }
      })

      if (newProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
        go.addComponent(new Text({
          text: newProps.children,
          style: {
            fill: newProps.color
          }
        }))
      }

      return go
    } else {
      const domElement = document.createElement(type);
      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else if (propName === 'onClick') {
          domElement.addEventListener('click', propValue);
        } else if (propName === 'className') {
          domElement.setAttribute('class', propValue);
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
      return domElement;
    }
  },
  createTextInstance: text => {
    return document.createTextNode(text);
    // console.log('createTextInstance')
    // const go = new GameObject()
    // go.addComponent(new Text({
    //   text
    // }))
    // return go
  },
  appendInitialChild: (parent, child) => {
    if (child instanceof Game) {
      parent.appendChild(child.canvas)
    } else if (child instanceof GameObject) {
      if (parent instanceof Game) {
        parent.scene.addChild(child)
      } else {
        parent.addChild(child)
      }
    } else {
      parent.appendChild(child);
    }
  },
  appendChild(parent, child) {
    if (child instanceof Game) {
      parent.appendChild(child.canvas)
    } else if (child instanceof GameObject) {
      if (parent instanceof Game) {
        parent.scene.addChild(child)
      } else {
        parent.addChild(child)
      }
    } else {
      parent.appendChild(child);
    }
  },
  finalizeInitialChildren: (domElement, type, props) => { },
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    if (domElement instanceof Game) {

    } else if (domElement instanceof GameObject) {
      domElement.transform.size.width = newProps.width || 100
      domElement.transform.size.height = newProps.height || 100
      domElement.transform.position.x = newProps.x || 0
      domElement.transform.position.y = newProps.y || 0
      domElement.transform.rotation = newProps.rotation || 0
      domElement.transform.origin.x = newProps.originX || 0
      domElement.transform.origin.x = newProps.originX || 0
      domElement.transform.anchor.y = newProps.anchorY || 0
      domElement.transform.anchor.y = newProps.anchorY || 0

      if (newProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
        let txt = domElement.getComponent(Text)
        if (!txt) {
          txt = domElement.addComponent(new Text({
            text: newProps.children,
            style: {
              fill: newProps.color
            }
          }))
        }
        txt && (txt.text = newProps.children)
      }

    } else {

      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
    }
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },
  clearContainer() { },
  getPublicInstance(instance) {
    return instance
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child)
  }
};
const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
  render: (reactElement, domElement, props, callback) => {
    game = new Game({
      systems: [
        new RendererSystem({
          width: props.width,
          height: props.height,
        }),
        new ImgSystem(),
        new TextSystem()
      ],
    })
    window.game = game
    // console.log(arguments);
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  },
};