import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';

const customStyles = {
  control: (base, _) => ({
    ...base,
    height: '45px',
    minHeight: '45px',
    border: '1px solid #dddddd',
    boxSizing: 'border-box',
  }),
  valueContainer: (base, _) => ({
    ...base,
    height: '45px',
    padding: '13px 15px',
    position: 'unset',
  }),
  placeholder: (base, _) => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#999999',
    margin: '0',
  }),
  singleValue: (base, _) => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#666666',
  }),
  menuList: (base, _) => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#666666',
  }),
};

export default function InputAsyncSelect({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <AsyncSelect name={fieldName} ref={ref} styles={customStyles} {...rest} />

      {error && <span>{error}</span>}
    </>
  );
}
