import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { TrashFill, PencilFill } from "react-bootstrap-icons";

import {
  Row,
  Col,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalComp from "../components/ModalComp";
import ModalCompCreate from "../components/ModalCompCreate";

export const UsersPosts = () => {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: true,
  };
  const [posts, setPosts] = useState(initialState);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(({ data }) => {
        setPosts((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setPosts({ data: undefined, loading: false, error: err.toString() });
      });
  }, [id]);

  const handleEditPost = (postId, title, body) => {
    setModalData({
      postId: postId,
      initialTitle: title,
      initialBody: body,
    });
    toggleModal();
  };

  const handleDeletePost = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    postId: null,
    initialTitle: "",
    initialBody: "",
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSavePost = () => {
    const updatedPost = {
  
    };

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/`, updatedPost)
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };
  const handleCancelEdit = () => {};

  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const toggleCreateModal = () => {
    setModalCreateOpen(!modalCreateOpen);
  };
  
  const handleCreatePost = (title, body) => {
    const newPost = {
      userId: id,
      title: title,
      body: body,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {})
      .catch((error) => { console.error("Error creating post:", error)});
  }

  const renderBody = () => {
    if (posts.loading) {
      return <Spinner />;
    } else if (posts.error) {
      return <h4 className="text-danger">Unexpected error occurred</h4>;
    } else {
      return posts.data?.map(({ id, title, body }) => (
        <Card className="mt-3" key={id}>
          <CardHeader>{title}</CardHeader>
          <CardBody>{body}</CardBody>
          <div className="post-actions">
            <Button color="danger" onClick={() => handleDeletePost(id)}>
              <TrashFill /> 
            </Button>
            <Button color="primary" onClick={() => handleEditPost(id)}>
              <PencilFill />
            </Button>
          </div>
        </Card>
      ));
    }
  };

    return (
      <Layout>
        <Row>
          <Col ms={12}>
            <Button onClick={toggleCreateModal} color="primary">
              Create Post
            </Button>
          </Col>
        </Row>
        <Row>
          <Col ms={12}>
            {renderBody()}
            {modalOpen && (
              <ModalComp
                isOpen={modalOpen}
                toggle={toggleModal}
                postId={modalData.postId}
                initialTitle={modalData.initialTitle}
                initialBody={modalData.initialBody}
                onSave={handleSavePost}
                onCancel={handleCancelEdit}
              />
            )}
            {modalCreateOpen && (
              <ModalCompCreate
                isOpen={modalCreateOpen}
                toggle={toggleCreateModal}
                onCreate={handleCreatePost}
              />
            )}
          </Col>
        </Row>
      </Layout>
    );
    
};
