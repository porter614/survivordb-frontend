import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./style.css"

const Item = props => {
  const { theme, item: { label, to, icon: Icon } = {}, onClick } = props

  return (
    <React.Fragment>
      <li className={"hiddenItem" in props ? "hiddenItem" : "item"} key={label}>
        <Link
          to={to}
          className={"hiddenItem" in props ? "inHiddenItem" : ""}
          onClick={onClick}
          data-slug={to}
        >
          {Icon && <Icon />} {label}
        </Link>
      </li>
    </React.Fragment>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  theme: PropTypes.object.isRequired
}

export default Item
