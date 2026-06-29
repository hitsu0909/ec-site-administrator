<template>
  <div class="container">
    <AdminHeaderBar />
    <h2 class="form-title">商品管理</h2>

    <!-- ローディング -->
    <div v-if="loading">
      <div class="spinner"></div>
      <p>読み込み中...</p>
    </div>

    <!-- テーブル -->
    <table v-else class="table">
      <thead>
        <tr>
          <th>商品ID</th>
          <th>商品名</th>
          <th>カテゴリ</th>
          <th>価格</th>
          <th>現在在庫</th>
          <th>在庫変更</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>¥{{ item.price.toLocaleString() }}</td>
          <td>{{ item.stock }}</td>
          <!-- 現在在庫 -->

          <td>
            <input
              type="number"
              v-model.number="item.editStock"
              min="0"
              @change="fixStock(item)"
            />
          </td>

          <td>
            <button class="btn btn-primary" @click="updateStock(item)">
              保存
            </button>
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
const products = ref([]);

// ✅ ダミーデータ
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/admin/products");
    const data = await res.json();

    // ✅ editStock初期化
    products.value = data.map((p) => ({
      ...p,
      editStock: p.stock,
    }));
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);

const fixStock = (item) => {
  if (!item.editStock || item.editStock < 0) {
    item.editStock = 0;
  }
};

const updateStock = async (product) => {
  try {
    await fetch(`http://localhost:8080/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: product.editStock, // ✅ここ重要
      }),
    });

    alert("在庫更新しました");

    await fetchProducts();
  } catch (e) {
    console.error("更新エラー", e);
  }
};
</script>
