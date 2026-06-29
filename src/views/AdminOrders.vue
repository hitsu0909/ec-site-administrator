<template>
  <div class="container">
    <AdminHeaderBar />

    <h2 class="form-title">注文管理</h2>

    <!-- ✅ フィルタ -->
    <div style="margin-bottom: 15px">
      <label>
        <input type="checkbox" v-model="showCompleted" />
        完了済みも表示
      </label>
    </div>

    <!-- ✅ ローディング -->
    <div v-if="loading">
      <div class="spinner"></div>
      <p>読み込み中...</p>
    </div>

    <!-- ✅ テーブル -->
    <table v-else class="table">
      <thead>
        <tr>
          <th>顧客番号</th>
          <th>注文番号</th>
          <th>注文日時</th>
          <th>点数</th>
          <th>金額</th>
          <th>状態</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.userId }}</td>
          <td>{{ order.orderNumber }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>{{ order.count }}点</td>
          <td>¥{{ order.total.toLocaleString() }}</td>
          <td>
            <span :class="getStatusClass(order.status)">
              {{ order.status }}
            </span>
          </td>
          <td>
            <button
              v-if="order.status !== '完了'"
              @click="updateStatus(order)"
              class="btn"
            >
              次の状態へ
            </button>
            <span v-else>完了</span>
          </td>
        </tr>
      </tbody>
    </table>

    <AdminFooterBar />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AdminHeaderBar from "@/components/AdminHeaderBar.vue";
import AdminFooterBar from "@/components/AdminFooterBar.vue";

const loading = ref(true);
const orders = ref([]);

// ✅ 完了表示切替
const showCompleted = ref(false);

// ✅ ダミーデータ

const fetchOrders = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/admin/orders");
    orders.value = await res.json();
  } catch (e) {
    console.error("取得エラー", e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOrders);

// ✅ 表示フィルタ
const filteredOrders = computed(() => {
  if (showCompleted.value) {
    return orders.value;
  }
  return orders.value.filter((o) => o.status !== "完了");
});

// ✅ 日付フォーマット
const formatDate = (date) => {
  const d = new Date(date);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");

  const h = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");

  return `${y}/${m}/${da} ${h}:${mi}`;
};

// ✅ 状態更新（4段階）
const updateStatus = async (order) => {
  try {
    await fetch(`http://localhost:8080/api/admin/orders/${order.id}`, {
      method: "PUT",
    });

    // ✅ 再取得（重要）
    const res = await fetch("http://localhost:8080/api/admin/orders");
    orders.value = await res.json();

    alert("ステータス更新しました");
  } catch (e) {
    console.error("更新エラー", e);
  }
};

// ✅ 見た目
const getStatusClass = (status) => {
  if (status === "未発送") return "status pending";
  if (status === "準備中") return "status working";
  if (status === "発送済") return "status shipping";
  return "status done";
};
</script>
