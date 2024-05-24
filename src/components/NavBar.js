import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react"; // Import useSession hook
import { useRouter } from "next/router";
import LoginWidget from "./LoginWidget";

const Container = styled("div")(({ theme: styledTheme }) => ({
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(0),
}));

const Wrapper = styled("div")(({ theme: styledTheme }) => ({
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(0),
}));

const Logo = styled("h1")(({ theme: styledTheme }) => ({
  fontWeight: "bold",
  marginTop: styledTheme.spacing(0),
}));

const Right = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: styledTheme.spacing(0),
}));

const Left = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: styledTheme.spacing(0),
}));

function Navbar() {
  const router = useRouter();
  const onClick = () => {
    router.push(`/Home`);
  };
  const onLogin = () => {
    router.push(`/login`);
  };

  const onRecipe = () => {
    router.push(`/GlobalRecipe`);
  };

  const { data: session } = useSession(); // Retrieve the session data

  return (
    <Container>
      <Wrapper>
        <Right>
          <Logo>RecipeRealm</Logo>
        </Right>
        <Left>
          <Button
            onClick={onClick}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              color: "#18453B",
              textTransform: "none",
              marginRight: "1.5em",
              fontSize: "1em",
            }}
          >
            Home
          </Button>
          <Button
            onClick={onRecipe}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              color: "#18453B",
              textTransform: "none",
              marginRight: "2em",
              fontSize: "1em",
            }}
          >
            Recipes
          </Button>
          {session && (
            <Button
              onClick={() => router.push("/create")}
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                color: "#18453B",
                textTransform: "none",
                marginRight: "2em",
                fontSize: "1em",
              }}
            >
              Create
            </Button>
          )}
          <LoginWidget
            onClick={onLogin}
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Login
          </LoginWidget>
        </Left>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
