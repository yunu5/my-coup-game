import characterImages from '../../assets/characters';
import React, { Component } from 'react'

export default class ChooseInfluence extends Component {
    
    selectInfluence = (influence) => {
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        const res = {
            influence: influence,
            playerName: this.props.name
        }
        console.log(res)
        this.props.socket.emit('g-chooseInfluenceDecision', res);
        this.props.doneChooseInfluence();
    }

    render() {
       const influences = this.props.influences.map((x, index) => {
  return (
    <button 
      id={`${x}`} 
      key={index} 
      onClick={() => this.selectInfluence(x)} // Keep the original function arguments intact!
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '10px', 
        margin: '10px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      <img 
        src={characterImages[x.toLowerCase()]} 
        alt={x} 
        style={{ width: '80px', height: '110px', objectFit: 'cover', borderRadius: '5px' }} 
      />
      <span style={{ textTransform: 'capitalize', marginTop: '8px' }}>{x}</span>
    </button>
  )
})
        return ( 
            <div>
                <p className="DecisionTitle">Choose an influence to lose </p>
                {influences}
            </div>
        )
    }
}
