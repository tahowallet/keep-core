import React from "react"
import { storiesOf } from "@storybook/react"
import centered from "@storybook/addon-centered/react"
import Chip from "../components/Chip"
import * as Icons from "../components/Icons"

storiesOf("Chip", module).addDecorator(centered)

export default {
  title: "Chip",
  component: Chip,
}

const Template = (args) => <Chip {...args} />

export const Tiny = Template.bind({})
Tiny.args = { text: "Tiny chip", size: "tiny" }

export const Small = Template.bind({})
Small.args = { text: "Small chip", size: "small" }

export const Big = Template.bind({})
Big.args = { text: "Big chip", size: "big" }

export const WithIcon = Template.bind({})
WithIcon.args = { text: "Chip with icon", icon: <Icons.KeepBlackGreen /> }
