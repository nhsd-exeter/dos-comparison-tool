from ..drivers.chrome_driver import get_driver


class page:
    """Base class to initialize the base webpage that will be called from all pages"""

    url_subdirectory: str
