locals {
  unit_tests = {
    ui = {
      name        = "ui"
      make_target = "ui-test"
    }
  }
  build = {
    ui = {
      name        = "ui"
      make_target = "ui-build"
    }
  }
}
