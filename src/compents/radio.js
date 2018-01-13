
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Component from './compent'

class Radio extends Component {
    static  propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        ]),
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
    };  
    constructor(){
      super()
      this.parent = null;
    }  
    render(){
    let { className, label, name, value, checked, defaultChecked,}=this.props;
    const radioClassNames = classnames(className, 'slds-radio');
    return (
      <label className={ radioClassNames }>
        <input
          type='radio'
          name={ name }
          value={ value }
          checked={ checked }
          defaultChecked={ defaultChecked }
          { ...props }
        />
        <span className='slds-radio--faux' />
        <span className='slds-form-element__label'>{ label }</span>
      </label>
    );
  };
} 
export default Radio
  