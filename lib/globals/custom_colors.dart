import 'package:flutter/material.dart';

const textColor = Color(0xFFe5f3fe);
const backgroundColor = Color(0xFF010b14);
const primaryColor = Color(0xFF81cffb);
const primaryFgColor = Color(0xFF010b14);
const secondaryColor = Color(0xFF1205a0);
const secondaryFgColor = Color(0xFFe5f3fe);
const accentColor = Color(0xFF6227f8);
const accentFgColor = Color(0xFFe5f3fe);

const colorScheme = ColorScheme(
  brightness: Brightness.dark,
  primary: primaryColor,
  onPrimary: primaryFgColor,
  secondary: secondaryColor,
  onSecondary: secondaryFgColor,
  tertiary: accentColor,
  onTertiary: accentFgColor,
  surface: backgroundColor,
  onSurface: textColor,
  error: Brightness.dark == Brightness.light
      ? Color(0xffB3261E)
      : Color(0xffF2B8B5),
  onError: Brightness.dark == Brightness.light
      ? Color(0xffFFFFFF)
      : Color(0xff601410),
);
