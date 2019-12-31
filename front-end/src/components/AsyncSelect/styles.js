const customStyles = {
  control: base => ({
    ...base,
    height: '45px',
    minHeight: '45px',
    border: '1px solid #dddddd',
    boxSizing: 'border-box',
  }),
  valueContainer: base => ({
    ...base,
    height: '45px',
    padding: '13px 15px',
    position: 'unset',
  }),
  placeholder: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#999999',
    margin: '0',
  }),
  singleValue: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#666666',
  }),
  menuList: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#666666',
  }),
  indicatorSeparator: () => ({}),
};

export default customStyles;
