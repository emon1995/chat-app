import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
// import Sell from "./Sell";
import SideDrawer from "../miscellaneous/SideDrawer";

const Edit = () => {
  const toast = useToast();
  const { user } = ChatState();
  // const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [productImage, setProductImage] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const { pId } = useParams();

  const submitHandler = async () => {
    setPicLoading(true);
    if (!title || !price || !product) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    console.log(title, price, product, productImage);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setTitle("");
      setProduct("");
      setPrice("");

      const { data } = await axios.put(
        `/products/update/${pId}`,
        {
          title,
          price,
          product,
          productImage,
          // users: user._id,
          // sender: user._id,
          // username: user.name,
          // userImage: user.pic,
        },
        config
      );

      console.log(data);
      toast({
        title: "Product Add Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //   localStorage.setItem("productInfo", JSON.stringify(data));
      setPicLoading(false);
      // navigate("/sell");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_title", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProductImage(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  useEffect(() => {
    axios
      .get(`/products/product/${pId}`)
      .then((res) => [
        setTitle(res.data.title),
        setProduct(res.data.product),
        setPrice(res.data.price),
        setProductImage(res.data.productImage),
      ])
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: "Failed to Product fetch",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  }, [pId, toast]);

  return (
    <div style={{ width: "100%" }}>
      <div>
        {user && <SideDrawer />}
        <Container maxW="xl" centerContent>
          <Box
            display="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text textAlign="center" fontSize="4xl" fontFamily="Work sans">
              Product
            </Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Product Update</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div>
                    <VStack spacing="5px">
                      <FormControl id="first-title" isRequired>
                        <FormLabel>title</FormLabel>
                        <Input
                          value={title}
                          placeholder="Enter Your title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input
                          value={price}
                          type="text"
                          placeholder="Enter Your product price"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="product" isRequired>
                        <FormLabel>Product</FormLabel>
                        <InputGroup size="md">
                          <Input
                            value={product}
                            type="text"
                            placeholder="Enter Product Description"
                            onChange={(e) => setProduct(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="pic">
                        <FormLabel>Upload your Product Picture</FormLabel>
                        <Input
                          type="file"
                          filename="productImage"
                          p={1.5}
                          accept="image/*"
                          onChange={(e) => postDetails(e.target.files[0])}
                        />
                      </FormControl>
                      <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        // type="submit"
                        onClick={submitHandler}
                        isLoading={picLoading}
                      >
                        Product Update
                      </Button>
                      <Link
                        style={{ textAlign: "center", textDecoration: "none" }}
                        to="/add"
                      >
                        Back to Add Product
                      </Link>
                    </VStack>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Edit;
