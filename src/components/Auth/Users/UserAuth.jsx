import React, { useContext } from "react";
import { Form, Input, Button, message, Switch } from "antd";
import classes from "./UserAuth.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/AuthContext";
import { Link } from "react-router-dom";

const UserAuth = ({ admin, isLogin }) => {
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const onFinish = (values) => {
    if (!admin) {
      const authUrl = "http://localhost:8080/user/";
      const jsonBody = {
        email: values.email,
        password: values.password,
        username: values.username,
      };
      if (!isLogin) {
        fetch(`${authUrl}signup`, {
          method: "POST",
          body: JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 403) {
            const data = res.json();
            message.error({
              content: data.message || "Seems Already taken",
              style: { marginTop: "20vh" },
            });
          } else if (res.status === 200) {
            message.success({
              content: "Successfully registered",
              style: { marginTop: "20vh" },
            });
          }
        });
      } else {
        fetch(`${authUrl}login`, {
          method: "POST",
          body: JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.login) {
              message.error({ content: data.message });
            } else {
              message.success({ content: data.message });
              AuthCtx.login(data.user);
              navigate("/");
            }
          });
      }
    } else {
      const adminUrl = "http://localhost:8080/admin/";
      const jsonBody = {
        email: values.email,
        password: values.password,
        username: values.username,
      };
      if (!isLogin) {
        fetch(`${adminUrl}signup`, {
          method: "POST",
          body: JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.isCreated) {
              message.error({
                content: data.message,
                style: { marginTop: "20vh" },
              });
            } else if (data.isCreated) {
              message.success({
                content: data.message,
                style: { marginTop: "20vh" },
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        fetch(`${adminUrl}login`, {
          method: "POST",
          body: JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.login) {
              message.error({ content: data.message || "Invalid Credentials" });
            } else {
              message.success({ content: data.message || "Logged in" });
              AuthCtx.logout();
              AuthCtx.adminLogin();
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className={classes.loginFormContainer}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <Switch
          checked={admin}
          disabled
          checkedChildren="Admin"
          unCheckedChildren="User"
        />
      </div>
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {!isLogin && (
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes.submit}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
      {isLogin && !admin && (
        <p>
          Don't have an account?
          <Link onClick={() => navigate("/auth")}>Register</Link>
        </p>
      )}
      {!isLogin && !admin && (
        <p>
          Already have an account?{" "}
          <Link onClick={() => navigate("/login")}>Login</Link>
        </p>
      )}
      {isLogin && admin && (
        <p>
          Don't have an account?
          <Link onClick={() => navigate("/admin")}>Register</Link>
        </p>
      )}
      {!isLogin && admin && (
        <p>
          Already have an account?{" "}
          <Link onClick={() => navigate("/admin/login")}>Login</Link>
        </p>
      )}
    </div>
  );
};

export default UserAuth;
