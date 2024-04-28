'use client';

import { Input } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignInForm = {
  username: string;
  password: string;
};

const SignInPage: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SignInForm> = async (validForm) => {
    const { username, password } = validForm;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const result = await res.json();
      alert('로그인 성공');
      console.log(`로그인 성공 : ${JSON.stringify(result)}`);
      return router.replace('/');
    } else {
      const error = await res.json();
      alert(`로그인 실패: ${error.message}`);
    }
  };
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-5xl items-center justify-between text-sm">로그인 화면</div>
      <form className="mx-auto flex w-64 max-w-full flex-col items-center justify-between gap-y-2">
        <label>
          아이디
          <Input
            {...register('username', {
              required: '아이디는 필수입니다.',
              pattern: {
                value: /^[a-z0-9]{4,20}$/,
                message: '아이디는 영문 소문자와 숫자로만 이루어져야 합니다',
              },
              minLength: {
                value: 4,
                message: '아이디는 4글자 이상이어야 합니다',
              },
              maxLength: {
                value: 20,
                message: '아이디는 20글자 이하여야 합니다',
              },
            })}
            type="text"
            name="username"
            placeholder="admin"
            required
          />
        </label>
        {errors.username && <p className="text-center text-xs text-red-500">{errors.username.message}</p>}
        <label>
          비밀번호
          <Input
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,32}$/,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
              },
              minLength: {
                value: 10,
                message: '비밀번호는 10자 이상이어야 합니다',
              },
              maxLength: {
                value: 32,
                message: '비밀번호는 32자 이하여야 합니다',
              },
            })}
            type="password"
            name="password"
            required
            placeholder="10~32자리"
          />
        </label>
        {errors.password && <p className="text-center text-xs text-red-500">{errors.password.message}</p>}
        <button type="submit" className="w-full rounded-md bg-blue-500 py-2 text-white">
          로그인
        </button>
      </form>
    </main>
  );
};

export default SignInPage;
