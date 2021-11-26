import { resource, RESOURCE_TYPE } from "@eva/eva.js"
import { Img as ImgComponent } from "@eva/plugin-renderer-img"
import { useEffect, useRef } from "react"
window.resource =resource
export default function Img(props) {
  const go = useRef(null)
  const img = useRef(null)
  // console.log(go,img)
  useEffect(() => {
  console.log(go,img)
  img.current = new ImgComponent()
    go.current.addComponent(img.current)
  }, [])
  useEffect(() => {
    console.log('change')
    resource.addResource([{
      name: props.src,
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: props.src
        }
      }
    }])
    img.current.resource = props.src
    console.log(props.src)
  }, [props.src])

  return <gameobject {...props} ref={go} />

}