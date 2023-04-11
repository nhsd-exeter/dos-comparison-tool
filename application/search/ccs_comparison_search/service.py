from dataclasses import dataclass


@dataclass(init=True, repr=True)
class Service:
    uid: int
    name: str
    address: str
    service_type: str
    distance: float
