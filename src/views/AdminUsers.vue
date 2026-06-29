<template>
  <div class="container">
    <AdminHeaderBar />
    <h2 class="form-title">ユーザー管理</h2>

    <!-- ローディング -->
    <div v-if="loading">
      <div class="spinner"></div>
      <p>読み込み中...</p>
    </div>

    <!-- テーブル -->
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>会社名</th>
          <th>ユーザー名</th>
          <th>メール</th>
          <th>電話番号</th>
          <th>新パスワード</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.companyName }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>

          <td>
            <input
              type="password"
              v-model="user.newPassword"
              placeholder="新しいパスワード"
            />
          </td>

          <td>
            <button class="btn" @click="updatePassword(user)">保存</button>
          </td>
        </tr>
      </tbody>
    </table>
    <AdminFooterBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminHeaderBar from "@/components/AdminHeaderBar.vue";
import AdminFooterBar from "@/components/AdminFooterBar.vue";
const loading = ref(true);
const users = ref([]);

// ✅ ダミーデータ
const fetchUsers = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/admin/users");
    users.value = await res.json();
    // console.log(users.value);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);

// ✅ パスワード更新
const updatePassword = async (user) => {
  if (!user.newPassword) {
    alert("パスワードを入力してください");
    return;
  }

  if (user.newPassword.length < 6) {
    alert("6文字以上入力してください");
    return;
  }

  try {
    await fetch(`http://localhost:8080/api/admin/users/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: user.newPassword,
      }),
    });

    alert(
      `id ${user.userId} のユーザーパスワードを ${user.newPassword} に更新しました`,
    );

    user.newPassword = "";
  } catch (e) {
    console.error("更新エラー", e);
  }
};
</script>
