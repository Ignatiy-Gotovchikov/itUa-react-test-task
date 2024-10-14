import { useState } from "react";
import { Button, Input, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import styles from '../styles/LoginForm.module.scss'

const schema = z.object({
  login: z.string().min(1, "Обовʼязкове поле"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

type LoginFormValues = z.infer<typeof schema>;

export const LoginForm = observer(() => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });
  
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    await authStore.authenticate(data.login, data.password);
    if (authStore.isAuthenticated) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Логін" validateStatus={errors.login ? "error" : ""} help={errors.login?.message}>
          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} placeholder="Введіть логін" />}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Введіть пароль"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className={styles.submitButton}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
