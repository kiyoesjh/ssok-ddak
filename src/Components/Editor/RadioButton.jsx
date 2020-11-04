import React from 'react';
import styled from 'styled-components';
import tags from 'category';

const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const List = styled.li`
  background-color: ${({ theme, tag }) => theme.categoryColor[tag]};
  color: #fff;
  transition: all 0.2s;
  opacity: ${({ checked }) => (checked ? `1` : `0.4`)};
  border-radius: 5px;
`;

const RadioLabel = styled.label`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 15px;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  filter: opacity(0);
  width: 0.1px;
  height: 0.1px;
`;

const RadioButton = ({ setCategory, category }) => {
  const onChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <ListWrap>
      {Object.keys(tags).map((tag) => (
        <List key={tag} tag={tag} checked={category === tag}>
          <RadioLabel htmlFor={tag}>
            <Radio
              type="radio"
              id={tag}
              value={tag}
              name="tag"
              onChange={onChange}
              checked={category === tag}
            />
            <span>{tags[tag]}</span>
          </RadioLabel>
        </List>
      ))}
    </ListWrap>
  );
};

export default RadioButton;
