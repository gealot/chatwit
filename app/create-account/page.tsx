'use client';

import { Input } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { checkEmailExists, checkUsernameExists, createUser } from '../api';

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  avatar?: string;
};

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SignUpForm> = async (validForm) => {
    const { username, email } = validForm;
    const usernameExists = await checkUsernameExists(username);
    const emailExists = await checkEmailExists(email);
    if (usernameExists) {
      alert('이미 존재하는 아이디입니다. 로그인화면으로 이동합니다.');
      return router.replace('/log-in');
    }
    if (emailExists) {
      alert('이미 존재하는 이메일입니다. 로그인화면으로 이동합니다.');
      return router.replace('/log-in');
    }
    const user = await createUser(validForm);
    alert('회원가입 성공');
    console.log(`회원가입 성공 : ${JSON.stringify(user)}`);
    return router.replace('/log-in');
  };
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center">
      <h1>회원가입</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-64 max-w-full flex-col items-center justify-between gap-y-2"
      >
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
          이메일
          <Input
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '이메일 형식이 아닙니다',
              },
            })}
            type="email"
            name="email"
            placeholder="test@test.com"
            required
          />
        </label>
        {errors.email && <p className="text-center text-xs text-red-500">{errors.email.message}</p>}
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
            placeholder="10~32자리"
          />
        </label>
        {errors.password && <p className="text-center text-xs text-red-500">{errors.password.message}</p>}
        <label>
          닉네임
          <Input
            {...register('nickname', {
              pattern: {
                value: /^[a-zA-Z가-힣\s]{2,20}$/,
                message: '한글 또는 영문 이름을 입력해 주세요',
              },
              minLength: {
                value: 2,
                message: '닉네임은 2자 이상이어야 합니다',
              },
              maxLength: {
                value: 20,
                message: '닉네임은 20자 이하여야 합니다',
              },
            })}
            type="text"
            name="nickname"
            placeholder="홍길동"
          />
        </label>
        {errors.nickname && <p className="text-center text-xs text-red-500">{errors.nickname.message}</p>}
        <label>
          프로필
          <Input
            {...register('avatar', {
              pattern: {
                value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/,
                message: '올바른 이미지 URL을 입력해 주세요(png, jpg, gif, webp 가능)',
              },
            })}
            type="url"
            name="avatar"
            placeholder="이미지 URL"
          />
        </label>
        {errors.avatar && <p className="text-center text-xs text-red-500">{errors.avatar.message}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-slate-500 p-2 text-center text-white transition-colors hover:bg-blue-500"
        >
          회원가입
        </button>
      </form>
    </main>
  );
};

export default SignUpPage;
