import React from "react";
import {
  Box,
  Zoom,
  Fab,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useCallback} from "react"
import useScrollTrigger from "@mui/material/useScrollTrigger";



function ScrollToTopFab() {
  const trigger = useScrollTrigger({
    threshold: 100,
  })

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          aria-label="Scroll back to top"
        >
          <KeyboardArrowUp fontSize="medium" />
        </Fab>
      </Box>
    </Zoom>
  )
}

export default ScrollToTopFab