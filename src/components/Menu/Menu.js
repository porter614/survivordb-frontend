import React from "react"
import PropTypes from "prop-types"

import { FaHome } from "react-icons/fa/"
import { GrGraphQl } from "react-icons/gr/"
import { GiFireBowl, GiSolarTime } from "react-icons/gi/"
import { IoIosPeople } from "react-icons/io/"
import { GoRequestChanges } from "react-icons/go"

import Item from "./Item"
import Expand from "./Expand"
import "./style.css"

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.itemList = React.createRef()

    this.items = [
      { to: "/", label: "Home", icon: FaHome },
      { to: "/seasons/", label: "Seasons", icon: GiSolarTime },
      { to: "/players/", label: "Players", icon: IoIosPeople },
      { to: "/versus/", label: "Versus", icon: GiFireBowl },
      { to: "/graph/", label: "Connections", icon: GrGraphQl },
      { to: "/contact/", label: "Request Features ", icon: GoRequestChanges }
    ]

    this.renderedItems = [] // will contain references to rendered DOM elements of menu
  }

  state = {
    open: false,
    hiddenItems: []
  }

  static propTypes = {
    path: PropTypes.string.isRequired,
    fixed: PropTypes.bool.isRequired,
    screenWidth: PropTypes.number.isRequired,
    fontLoaded: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.renderedItems = this.getRenderedItems()
  }

  getRenderedItems = () => {
    const itemList = this.itemList.current
    return Array.from(itemList.children)
  }

  render() {
    const { screenWidth, theme } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        <nav className={`menu ${open ? "open" : ""}`} rel="js-menu">
          <ul className="itemList" ref={this.itemList}>
            {this.items.map(item => (
              <Item
                item={item}
                key={item.label}
                icon={item.icon}
                theme={theme}
              />
            ))}
            {this.state.hiddenItems.map(item => (
              <Item
                item={item}
                key={item.label}
                icon={item.icon}
                theme={theme}
              />
            ))}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Menu
