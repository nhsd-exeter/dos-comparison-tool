from ...ccs.service import Service


class TestService:
    uid = 123
    name = "test"
    address = "test"
    service_type = "test"
    distance = 1.0

    def test__init__(self) -> None:
        # Act
        service = Service(
            uid=self.uid,
            name=self.name,
            address=self.address,
            service_type=self.service_type,
            distance=self.distance,
        )
        # Assert
        assert service.uid == self.uid, "Uid not set correctly"
        assert service.name == self.name, "Name not set correctly"
        assert service.address == self.address, "Address not set correctly"
        assert service.service_type == self.service_type, "Service type not set correctly"
        assert service.distance == 1.0, "Distance not set correctly"

    def test__repr__(self) -> None:
        # Act
        service = Service(
            uid=self.uid,
            name=self.name,
            address=self.address,
            service_type=self.service_type,
            distance=self.distance,
        )
        # Assert
        assert (
            service.__repr__() == f"Service(uid={self.uid}, name='{self.name}', "
            f"address='{self.address}', service_type='{self.service_type}', distance={self.distance})"
        ), "Service representation not correct"
