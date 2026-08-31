import characterImages from '../../assets/characters';
import React, { Component } from 'react'

export default class RevealDecision extends Component {

    constructor(props) {
        super(props)

        this.act = this.props.res.isBlock ? this.props.res.counterAction.counterAction : this.props.res.action.action
        this.actionMap = {
            tax: ["duke"],
            assassinate: ["assassin"],
            exchange: ["ambassador"],
            steal: ["captain"],
            block_foreign_aid: ["duke"],
            block_steal: ["ambassador", "captain"],
            block_assassinate: ["contessa"],
        }
    }
    
    selectInfluence = (influence) => {
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        const res = {
            revealedCard: influence,
            prevAction: this.props.res.action,
            counterAction: this.props.res.counterAction,
            challengee: this.props.res.challengee,
            challenger: this.props.res.challenger,
            isBlock: this.props.res.isBlock
        }
        console.log(res)
        this.props.socket.emit('g-revealDecision', res);
        this.props.doneReveal();
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
                <p>Your <b>{this.act}</b> has been challenged! If you don't reveal {this.actionMap[this.act].join(' or ')} you'll lose influence! </p>
                {influences}
            </div>
        )
    }
}
