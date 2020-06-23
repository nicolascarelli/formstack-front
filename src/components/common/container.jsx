import React, { useEffect, useState } from 'react';

const Container = (props) => {
    
    const [isMobile, setIsMobile] = useState(true);
    
    useEffect(() => {
        if (window.innerWidth > 767)
            setIsMobile(false)
    })

    let { bg, maxWidth } = props
       console.log(maxWidth)

    const bgStyle = () => {
        
        let bgStyle = {
            backgroundSize: 'cover'
        }

        if(bg === undefined) return
        if(bg.image){
            if(isMobile && bg.imageMobile)
                bgStyle.backgroundImage = `url(${process.env.PUBLIC_URL}/img/${bg.imageMobile})`
            else
                bgStyle.backgroundImage = `url(${process.env.PUBLIC_URL}/img/${bg.image})`
        }
        if(bg.color){
            bgStyle.backgroundColor = bg.color
        }
        
        console.log(bgStyle)
        return bgStyle
    }

    const containerStyle = () => {
        
        let style = {}
        if(maxWidth === undefined)
            return
            
        style.maxWidth = maxWidth

        return style
    }

    return ( 
        <div className="row" style={bgStyle()}>
            <div className="col">
                <div className="container" style={containerStyle()}>
                    {props.children}
                </div>
            </div>
        </div>
     );
}
 
export default Container;