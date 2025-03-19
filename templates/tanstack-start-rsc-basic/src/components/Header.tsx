import { AppBar, Box, Toolbar, css, styled } from "@mui/material";
import { CustomLink } from "./CustomLink";

const StyledCustomLink = styled(CustomLink)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
    margin-right: ${theme.spacing(2)};
  `
);

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <StyledCustomLink to="/">Home</StyledCustomLink>
          <StyledCustomLink to="/news">News</StyledCustomLink>
          <StyledCustomLink to="/weather">Weather</StyledCustomLink>
          <StyledCustomLink to="/recipes">Recipes</StyledCustomLink>
          <StyledCustomLink to="/stocks">Stocks</StyledCustomLink>
          <StyledCustomLink to="/posts">Posts</StyledCustomLink>
          <StyledCustomLink to="/users">Users</StyledCustomLink>
          <StyledCustomLink to="/counter">Counter</StyledCustomLink>
          <StyledCustomLink to="/deferred">Deferred</StyledCustomLink>
          <StyledCustomLink to="/route-a">Pathless Layout</StyledCustomLink>
          <StyledCustomLink to="/test">Test</StyledCustomLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
