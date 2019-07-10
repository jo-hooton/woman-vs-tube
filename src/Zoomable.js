import React from 'react'

class Zoomable extends React.Component {

    state = {
        zoom: 1,
        transformOrigin: 'center'
    }

    zoomTo = target => {
        const classes = [...target.classList].join()
        if (classes.match(/st[0-9]/g).length > 0) {

            const clientRect = target.getBoundingClientRect()
            
            this.setState({
                zoom: 4,
                transformOrigin:`${clientRect.left}px ${clientRect.top}px`
            })
        } else {
            this.setState({
                zoom: 1,
                transformOrigin: 'center'
            })

        }

        console.log(target)
       
    }
  
    render() {
        const { children } = this.props
        return (
            <div className="zoomable" style={{ width: '100vw', height: '100vh', transform: `scale(${this.state.zoom})`, transformOrigin: this.state.transformOrigin }}>
                {
                    { ...children, props: { ...children.props, onClick: e => this.zoomTo(e.target) } }
                }
            </div>
        )
    }
}


export default Zoomable