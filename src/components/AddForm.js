import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../vars';
import Loader from './Loader';
import ExampleSenteces from './ExampleSenteces';
import ProblemsStore from '../stores/ProblemsStore';

const Input = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;

  &:focus {
    outline: none;
  }
`;

const TextWrap = styled.div`
  position: relative;
  font-size: 30px;
  color: ${primaryColor};
  border-bottom: 5px dotted ${primaryColor};

  @media (min-width: 800px) {
    font-size: 40px;
  }

  @media (min-width: 1200px) {
    font-size: 60px;
  }
`;

const Wrapper = styled.div`
  opacity: 0;
`;

class AddForm extends React.Component {
  state = {
    error: false,
    value: '',
    busy: false,
    done: false,
    focus: false
  };

  onSubmit = async e => {
    e.preventDefault();

    if (this.state.value) {
      this.setState({ busy: true });

      try {
        const problem = await ProblemsStore.createProblem(this.state.value);
        this.props.submitDone();
        this.setState({ done: true });
        window.history.replaceState('', '', `${problem._id}`);
      } catch (e) {
        this.setState({ busy: false });

        alert(e.message);
      }
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onFocus = () => {
    this.setState({ focus: true });
    this.props.onFocus(this.state.value);
  };

  onBlur = () => {
    this.setState({ focus: false });
    this.props.onBlur(this.state.value);
  };

  render() {
    const { value, busy, done, focus } = this.state;
    const { onFocus, onBlur } = this.props;
    if (done) return null;

    const hideExamples = value || focus;
    return (
      <Wrapper>
        {busy && <Loader />}
        {!busy && (
          <form onSubmit={this.onSubmit}>
            <TextWrap>
              {!hideExamples && <ExampleSenteces />}
              <Input
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                type="text"
                value={value}
                onChange={this.onChange}
              />
            </TextWrap>
          </form>
        )}
      </Wrapper>
    );
  }
}

export default AddForm;
