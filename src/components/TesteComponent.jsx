import React, { useState } from 'react';
import RadioButton from './RadioButton';
import aluno from '../assets/aluno.png'
import professor from '../assets/professor.png'
import turma from '../assets/turma.png'

const options = [
  {
    value: 'option1',
    label: 'Aluno',
    imageUrl: `${aluno}`,
  },
  {
    value: 'option2',
    label: 'Professor',
    imageUrl: `${professor}`,
  },
  {
    value: 'option3',
    label: 'Turma',
    imageUrl: `${turma}`,
  },
];

const ParentComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <>
      <h2>Escolha uma opção:</h2>
      <RadioButton
        options={options}
        name="opcoes"
        onChange={handleRadioChange}
      />
      <p>Opção selecionada: {selectedOption}</p>
    </>
  );
};

export default ParentComponent;
