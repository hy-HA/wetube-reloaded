## NodeJS로 서버 구축해보기

## 시연 영상
<p align="center">
  <img src="https://github.com/hy-HA/wetube-reloaded/issues/1#issue-1841590009">
</p>

## 구현기능
### 홈화면
- 회원가입, 로그인
- 영상 검색
```
/ -> Home
/join -> Join
/login -> Login
/search -> Search
```

### 유저
- 프로필 조회
- 로그아웃
- 회원정보 수정
- 프로필 삭제
```
/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile
```
### 비디오
- 영상 조회
- 영상 편집
- 영상 삭제
- 영상 업로드
```
/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete video
/videos/upload -> Upload Video
```

