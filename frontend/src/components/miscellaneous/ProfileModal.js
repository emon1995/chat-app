import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // console.log("currentuser", currentUser);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setCurrentUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const sellHandler = () => {navigate("/add");}
  const buyHandler = () => {navigate("/buy");}

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <Center>
            <ModalHeader
              fontSize="40px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              {user.name}
            </ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Center>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
            </Center>
            <Center>
              <Text
                fontSize={{ base: "28px", md: "20px" }}
                fontFamily="Work sans"
              >
                Username: {user.name}
              </Text>
            </Center>
            <Center>
              <Text
                fontSize={{ base: "28px", md: "20px" }}
                fontFamily="Work sans"
              >
                Email: {user.email}
              </Text>
            </Center>
          </ModalBody>
          {/* <ModalFooter> */}
          <Center>
            {currentUser.name === user.name ? (
              <div>
                <Button mr={3} mb={5} colorScheme="green" onClick={sellHandler}>
                  Sell
                </Button>
                <Button colorScheme="blue" mr={3} mb={5} onClick={buyHandler}>
                  Buy
                </Button>
              </div>
            ) : (
              ""
            )}
          </Center>
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
