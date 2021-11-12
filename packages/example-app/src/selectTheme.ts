export const selectTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#88daff",
    neutral0: "#181a1b",
    neutral20: "#3e4446",
    primary25: "#212425",
    neutral80: "white",
    primary50: "#3e4446",
  },
});
