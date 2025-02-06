// ==================================

export const DropdownList = (props) => {
  return <div className="dropdown-list">{props.children}</div>;
};

// ==================================

export const DropdownItem = (props) => {
  return (
    <div onClick={props.onClick} className="dropdown-list__item btn-secondary">
      {props.children}
    </div>
  );
};

// ==================================

export const Tooltip = (props) => {
  return (
    <span aria-hidden="true" className="default__tooltip">
      {props.children}
    </span>
  );
};

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};
