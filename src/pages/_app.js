/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import Head from "next/head";
import { Container } from "@mui/material";
import theme from "../material/theme";
import NavBar from "../components/NavBar";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [selectedRecipe, setSelectedRecipeState] = useState(null);
  const router = useRouter();

  const setSelectedRecipe = (recipe) => {
    if (recipe) {
      setSelectedRecipeState(recipe);
      router.push(`/recipe/${recipe.id}`);
    } else {
      router.push("/GlobalRecipe");
    }
  };
  const props = {
    ...pageProps,
    setSelectedRecipe,
    selectedRecipe,
  };

  return (
    <SessionProvider session={session}>
      <AppCacheProvider {...pageProps}>
        <Head>
          <title>RecipeRealm</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <main
            style={{
              width: "100%",
              minHeight: "100vh",
              maxHeight: "100%",
              background: "#e5efff",
            }}
          >
            <Container
              style={{
                background: "#e5efff",
                paddingTop: "2em",
                height: "100%",
              }}
            >
              {/* <Typography variant="h2" align="center">RecipeRealm</Typography> */}
              <NavBar />
              <Component {...props} />
            </Container>
          </main>
        </ThemeProvider>
      </AppCacheProvider>
    </SessionProvider>
  );
}
